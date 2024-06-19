package com.example.a1menuapp

import android.os.Bundle
import android.widget.GridLayout
import android.widget.ScrollView
import android.widget.TextView
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.BottomAppBar
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.asImageBitmap
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.a1menuapp.model.Food
import com.example.a1menuapp.ui.theme.A1MenuAppTheme
import com.example.pannuchispizza.OrderQRCode

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            A1MenuAppTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    MenuCard()
                }
            }
        }
    }

    var total by mutableStateOf(0.00);
    var qrVisible by mutableStateOf(false);

    /***
     * Specifies app logo
     */
    @Composable
    fun AppIcon(modifier: Modifier = Modifier) {
        A1MenuAppTheme {
            val image = painterResource(R.drawable.menu_app_icon)
            Image(painter = image,
                contentDescription = stringResource(R.string.app_icon_description),
                modifier = Modifier
                    .padding(25.dp)
                    .fillMaxWidth(),
                contentScale = ContentScale.Crop
            )
        }
    }

    /**
     * Order QR
     */
    @Composable
    fun OrderQR(order: List<Food>, modifier: Modifier = Modifier) {
        var strCode = "";
        for (food in order){
            if(food.quantity > 0){
                strCode += food.qrOrderID();
            }
        }
        val bitmap = OrderQRCode();
        Spacer(modifier = modifier.padding(top=10.dp))
        if(strCode.isNotEmpty()){
            val qr = bitmap.encodeStringToBitmap(strCode);
            Image(
                modifier = modifier.fillMaxWidth(),
                bitmap = qr.asImageBitmap(),
                contentDescription = null,
                contentScale = ContentScale.FillWidth
            )
        }
    }

    /**
     * Specifies each row in menu column
     */
    @Composable
    fun MenuSection(food: Food, menu: List<Food> , modifier: Modifier = Modifier) {
        Row(
            modifier = Modifier.fillMaxSize(),
            horizontalArrangement = Arrangement.SpaceBetween,
        ) {
            Text(
                text = food.name,
                fontSize = 20.sp,
                lineHeight = 24.sp,
                color = Color.Blue,
                textAlign = TextAlign.Start
            )
            Text(
                text = food.priceStr() + "$",
                fontSize = 18.sp
            )
        }
        Row(
            modifier = Modifier.fillMaxSize()
        ) {
            Text(text=food.description,
                modifier = Modifier.padding(0.dp, 5.dp, 0.dp, 10.dp))
        }
        Row(
            modifier = Modifier.fillMaxSize(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            var result by remember { mutableStateOf(food.quantity) }
            Row(modifier = Modifier.fillMaxHeight()
            ){
                Button(onClick = {
                    food.increaseQuantity(); result = food.quantity;
                                    total=countCardTotal(menu); qrVisible = false},
                    modifier = Modifier
                        .height(40.dp)
                        .width(70.dp),
                        colors = ButtonDefaults.buttonColors(Color.Green)) {
                    Text(stringResource(R.string.add_btn_content), fontSize = 20.sp)
                }
                Button(onClick = {food.decreaseQuantity(); result = food.quantity;
                                    total=countCardTotal(menu); qrVisible = false},
                    modifier = Modifier
                        .height(40.dp)
                        .width(70.dp)) {
                    Text(stringResource(R.string.remove_btn_content),fontSize = 20.sp)
                }
            }

            Text(text=result.toString(),fontSize = 30.sp)
        }
        Spacer(modifier = modifier.padding(10.dp))
    }

    /**
     * Specifies menu column
     */
    @Composable
    fun MenuList(foodList: List<Food>, modifier: Modifier = Modifier) {
        Text(text= stringResource(R.string.menu_header),
            modifier= Modifier
                .padding(0.dp, 5.dp, 0.dp, 20.dp)
                .fillMaxWidth(),
            color = Color.Red,
            fontSize = 25.sp,
            textAlign = TextAlign.Start
        )
        Column(modifier = modifier) {
            foodList.forEach {food ->
                MenuSection(
                    food = food,
                    menu = foodList,
                    modifier = Modifier.padding(10.dp)
                )
            }
        TotalSection(Modifier);
        if(qrVisible){
            OrderQR(foodList, Modifier);
        }
    }
}

    /**
     * Order bar
     * Total order and place order button
     */
    @Composable
    fun TotalSection(modifier: Modifier = Modifier) {
        Spacer(modifier = modifier.padding(top = 12.dp))
        Row(modifier = Modifier.fillMaxSize(),
            horizontalArrangement = Arrangement.SpaceBetween) {
            Text(
                text = "Total: ${String.format("%.2f", total)}",
                fontSize = 25.sp,
                fontWeight = FontWeight.Bold
            )
            Button(onClick = {qrVisible = true;},
                modifier = Modifier
                    .height(40.dp)
                    .width(160.dp)) {
                Text("Place Order",fontSize = 20.sp)
            }
        }
    }

    /**
     * Function returns order total
     */

    private fun countCardTotal(foodList: List<Food>) : Double{
        var total = 0.00;
        for (food in foodList){
            total += food.price();
        }
        return total;
    }

    /**
     * Entire app layout
     */

    @Preview(showBackground = true)
    @Composable
    fun MenuCard() {
        A1MenuAppTheme {
            var menu = listOf<Food>(
                Food(getString(R.string.food_name_1),14.30,getString(R.string.food_description_1),getString(R.string.food_id_1)),
                Food(getString(R.string.food_name_2),15.00, getString(R.string.food_description_2), getString(R.string.food_id_2)),
                Food(getString(R.string.food_name_3),15.45,getString(R.string.food_description_3),getString(R.string.food_id_3)),
                Food(getString(R.string.food_name_4), 16.50, getString(R.string.food_description_4), getString(R.string.food_id_4)),
                Food(getString(R.string.food_name_5), 17.00,getString(R.string.food_description_5),getString(R.string.food_id_5)),
                Food(getString(R.string.food_name_6),17.40,getString(R.string.food_description_6),getString(R.string.food_id_6))
            );
            Card(modifier = Modifier) {
                Column(
                    modifier = Modifier
                        .padding(40.dp)
                        .verticalScroll(rememberScrollState()),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Center
                ) {
                    AppIcon();
                    MenuList(menu, Modifier);
                }
            }
        }
    }
}

//https://github.com/Ethiel97/kotlin-shoppingCart/tree/part-one/app/src/main/java/com/example/ethieladiassa/shoppingcart

// pass @Composable as parameter
//https://stackoverflow.com/questions/74665777/how-to-pass-a-composable-to-another-composable-as-its-parameter-and-display-run

//button
//https://developer.android.com/jetpack/compose/touch-input/handling-interactions

//android pager
//https://developer.android.com/jetpack/compose/layouts/pager