package com.simple.boot.web.communication;

public interface Response {
    public void header(String header, String value);
    public void status(int header);
}