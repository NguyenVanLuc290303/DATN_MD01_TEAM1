package com.datn_md01_team1

import android.content.Intent
import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.BaseActivityEventListener
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import vn.zalopay.sdk.ZaloPayError
import vn.zalopay.sdk.ZaloPaySDK
import vn.zalopay.sdk.listeners.PayOrderListener

class ZPModule(private val mReactContext: ReactApplicationContext) : ReactContextBaseJavaModule(
    mReactContext
),PayOrderListener  {
    val PAYMENTSUCCESS = "1"
    val PAYMENTFAILED = "-1"
    val PAYMENTCANCELED = "4"

    var activityEventListener: BaseActivityEventListener = object : BaseActivityEventListener() {
        override fun onNewIntent(intent: Intent) {
            super.onNewIntent(intent)
            ZaloPaySDK.getInstance().onResult(intent);

        }
    }

    init {
        mReactContext.addActivityEventListener(activityEventListener)
    }

    override fun getName(): String {
        return "PayZaloBridge"
    }

    @ReactMethod
    fun payOrder(zpTransToken: String?) {
        val currentActivity = currentActivity
        ZaloPaySDK.getInstance().payOrder(
            currentActivity!!,
            zpTransToken!!, "demozpdk://app", this
        )
    }

    @ReactMethod
    fun installApp() {
        ZaloPaySDK.getInstance().navigateToZaloOnStore(mReactContext)
    }

    @ReactMethod
    fun addListener(eventName: String) {

    }

    @ReactMethod
    fun removeListeners(count: Int) {

    }

    private fun sendEvent(reactContext: ReactContext, eventName: String, params: WritableMap) {
        reactContext.getJSModule(
            DeviceEventManagerModule.RCTDeviceEventEmitter::class.java
        )
            .emit(eventName, params)
    }

    override fun onPaymentSucceeded(
        transactionId: String,
        transToken: String,
        appTransID: String
    ) {
        Log.d("ZPModule", "onPaymentSucceeded: ${transactionId}")
        // Handle Success
        val params = Arguments.createMap()
        params.putString("transactionId", transactionId)
        params.putString("transToken", transToken)
        params.putString("appTransID", appTransID)
        params.putString("returnCode", PAYMENTSUCCESS)
        sendEvent(mReactContext, "EventPayZalo", params)
    }

    override fun onPaymentCanceled(transToken: String, appTransID: String) {
        Log.d("ZPModule", "onPaymentCanceled: ${transToken}")
        // Handle Cancel
        val params = Arguments.createMap()
        params.putString("returnCode", PAYMENTCANCELED)
        params.putString("zpTranstoken", transToken)
        params.putString("appTransID", appTransID)
        sendEvent(mReactContext, "EventPayZalo", params)
    }

    override fun onPaymentError(     zaloPayError: ZaloPayError,
                                     transToken: String,
                                     appTransID: String) {
        Log.d("ZPModule", "onPaymentError: ${zaloPayError}")
        // Handle Error
        val params = Arguments.createMap()
        params.putString("returnCode", PAYMENTFAILED)
        params.putString("zpTranstoken", transToken)
        params.putString("appTransID", appTransID)
        sendEvent(mReactContext, "EventPayZalo", params)
        Log.d("ZPModule", "onPaymentError: ${zaloPayError}");
    }
}
