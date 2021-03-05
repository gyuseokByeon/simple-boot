package com.example.service;

import com.example.model.User;
import com.simple.boot.anno.Injection;
import com.simple.boot.anno.Service;
import com.simple.boot.hibernate.HibernateStarter;

import java.util.Arrays;
import java.util.List;

@Service
public class UserService {
    private final HibernateStarter hibernateStarter;

    @Injection
    public UserService(HibernateStarter hibernateStarter) {
        this.hibernateStarter = hibernateStarter;
    }

    public List<User> users() {
        User user = new User();
        user.setAge(1);
        user.setName("name1");
        User user2 = new User();
        user2.setAge(2);
        user2.setName("name2");
        return Arrays.asList(user, user2);
    }
}