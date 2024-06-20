from AddressApp.address import Address
import oracledb
import os

class Database:
    def __init__(self, autocommit=True):
        self.__connection = self.__connect()
        self.__connection.autocommit = autocommit

    def run_file(self, file_path):
        statement_parts = []
        with self.__get_cursor() as cursor:
            with open(file_path, 'r') as f:
                for line in f:
                    statement_parts.append(line)
                    if line.strip('\n').strip('\n\r').strip().endswith(';'):
                        statement = "".join(
                            statement_parts).strip().rstrip(';')
                        if statement:
                            try:
                                cursor.execute(statement)
                            except Exception as e:
                                print(e)
                        statement_parts = []

    
    def add_address(self, address):
        '''Add an address to the DB for the given Address object'''
        with self.__get_cursor() as cursor:
            cursor.execute("INSERT INTO FLASK_ADDRESSES VALUES(:name,:street,:city,:province)",
                        name=address.name,street=address.street,city=address.city,province=address.province)

    def get_address(self, name):
        '''Returns an Address object based on the provided name'''
        with self.__get_cursor() as cursor:
            try:
                address_info=cursor.execute("Select name, street, city, province from FLASK_ADDRESSES where name=:name",name=name)
                for info in address_info:
                    address=Address(info[0],info[1],info[2],info[3])
                    return address
            except Exception:
                return None

    def get_addresses(self):
        '''Returns all Address objects in a list'''
        with self.__get_cursor() as cursor:
            dbaddresses=cursor.execute("Select name, street, city, province from FLASK_ADDRESSES")
            addresses=[]
            for dbaddress in dbaddresses:
                address=Address(dbaddress[0],dbaddress[1],dbaddress[2],dbaddress[3])
                addresses.append(address)
            return addresses

    def close(self):
        '''Closes the connection'''
        if self.__connection is not None:
            self.__connection.close()
            self.__connection = None


    def __get_cursor(self):
            for i in range(3):
                try:
                    return self.__connection.cursor()
                except Exception as e:
                    # Might need to reconnect
                    self.__reconnect()

    def __reconnect(self):
        try:
            self.close()
        except oracledb.Error as f:
            pass
        self.__connection = self.__connect()

    def __connect(self):
        return oracledb.connect(user=os.environ['DBUSER'], password=os.environ['DBPWD'],
                                             host="198.168.52.211", port=1521, service_name="pdbora19c.dawsoncollege.qc.ca")


if __name__ == '__main__':
    print('Provide file to initialize database')
    file_path = input()
    if os.path.exists(file_path):
        db = Database()
        db.run_file(file_path)
        db.close()
    else:
        print('Invalid Path')
