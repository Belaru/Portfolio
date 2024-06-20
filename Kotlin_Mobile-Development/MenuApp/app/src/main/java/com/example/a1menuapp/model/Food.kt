package com.example.a1menuapp.model

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import java.math.RoundingMode
import java.text.DecimalFormat
class Food(
    val name:String,
    val price:Double,
    val description:String,
    val foodID:String,
    )
{
    var quantity by mutableStateOf(0);
    override fun toString(): String {
        return name+" "+price;
    }
    fun priceStr(): String {
        val roundoff = String.format("%.2f", price)
        return roundoff;
    }

    fun price(): Double {
        val total = price*quantity;
        return total;
    }
    fun increaseQuantity(){
        quantity += 1;
    }

    fun decreaseQuantity(){
        if(quantity>0){
            quantity -= 1;
        }
    }

    fun qrOrderID() : String{
        return foodID + quantity;
    }
}

