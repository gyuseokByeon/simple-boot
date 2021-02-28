package com.simple.boot.web.bootstrap;

import com.simple.boot.anno.Controller;
import com.simple.boot.bootstrap.SimpleApplication;
import com.simple.boot.bootstrap.SimpleBoot;
import com.simple.boot.web.anno.GetMapping;
import com.simple.boot.web.config.WebConfig;
import com.simple.boot.web.connection.NettyConnection;
import com.simple.boot.web.dispatch.NettyDispatcher;
import lombok.extern.slf4j.Slf4j;
import org.reactivestreams.Publisher;
import org.reflections.Reflections;
import org.reflections.scanners.MethodAnnotationsScanner;
import reactor.core.publisher.Mono;
import reactor.netty.DisposableServer;
import reactor.netty.http.server.HttpServer;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Map;
import java.util.Set;

@Slf4j
public class SimpleWebApplication extends SimpleApplication implements SimpleBoot {
    @Override
    public void run(Class start) throws InvocationTargetException, NoSuchMethodException, InstantiationException, IllegalAccessException {
        super.run(start);
        WebConfig webConfig = this.getYamlConfigLoader().load(WebConfig.class);
        HttpServer httpServer = new NettyConnection().create().host(webConfig.getWeb().getHost()).port(webConfig.getWeb().getPort());
        DisposableServer server = httpServer.route(routes -> {
            try {
                new NettyDispatcher(routes).mapping();
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }).wiretap(true).bindNow();
        server.onDispose().block();
    }
}
