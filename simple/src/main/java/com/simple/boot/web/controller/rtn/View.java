package com.simple.boot.web.controller.rtn;

import lombok.Getter;

import java.util.HashMap;

@Getter
public class View extends HashMap {
    String view;
    public View(String view){
        this.view = view;
    }
}