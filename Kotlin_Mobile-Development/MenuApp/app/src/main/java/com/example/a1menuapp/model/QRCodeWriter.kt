package com.example.pannuchispizza

import android.graphics.Bitmap
import android.graphics.Color
import com.google.zxing.BarcodeFormat
import com.google.zxing.WriterException
import com.google.zxing.common.BitMatrix
import com.google.zxing.qrcode.QRCodeWriter


// To use these libraries, must add the following to dependencies in build.gradle (Module:app)
//implementation 'com.google.zxing:core:3.4.1'
//implementation 'com.google.code.gson:gson:2.8.9'

class OrderQRCode {

    @Throws(WriterException::class)
    fun encodeStringToBitmap(str: String): Bitmap {
        /* First encode the string into a bit matrix... */
        val bitMatrix: BitMatrix = QRCodeWriter().encode(str, BarcodeFormat.QR_CODE, 400, 400)

        val pixels = IntArray(bitMatrix.width * bitMatrix.height)

        /* ... then translate the bit matrix into a grid of pixels ... */
        for (y in 0 until bitMatrix.height) {
            val offset = y * bitMatrix.width

            for (x in 0 until bitMatrix.width) {
                if (bitMatrix[x, y]) {
                    pixels[offset + x] = Color.BLACK
                } else {
                    pixels[offset + x] = Color.WHITE
                }
            }
        }

        /* ... finally put the grid of pixels into a bitmap image */
        val bitmap: Bitmap =
            Bitmap.createBitmap(bitMatrix.width, bitMatrix.height, Bitmap.Config.ARGB_8888)
        bitmap.setPixels(pixels, 0, bitMatrix.width, 0, 0, bitMatrix.width, bitMatrix.height)

        return bitmap
    }
}