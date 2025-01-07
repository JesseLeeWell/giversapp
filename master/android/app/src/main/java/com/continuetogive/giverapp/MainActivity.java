package com.continuetogive.giverapp;

import com.getcapacitor.BridgeActivity;
import android.content.Intent;
import android.os.Bundle;

import co.boundstate.BranchDeepLinks;
import io.branch.referral.Branch;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        registerPlugin(BranchDeepLinks.class);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        this.setIntent(intent);
        super.onNewIntent(intent);
    }
}
