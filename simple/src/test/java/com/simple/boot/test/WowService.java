package com.simple.boot.test;

import com.simple.boot.anno.Controller;
import com.simple.boot.anno.Service;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class WowService {
    public WowService() {
        log.debug("wow constructor hello Service ");
    }
}
