package com.sesery.released;

import com.getcapacitor.BridgeActivity;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;

public class MainActivity extends BridgeActivity {}

@Override
public void onCreate(Bundle savedInstanceState) {
  super.onCreate(savedInstanceState);
  registerPlugin(GoogleAuth.class);
}
