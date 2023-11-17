package com.gamehub.interceptor;

import com.gamehub.entity.Account;
import com.gamehub.service.AccountService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import java.util.Optional;

@Component
public class GlobalInterceptor implements HandlerInterceptor {
    @Autowired
    private AccountService accountService;

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
            ModelAndView modelAndView) throws Exception {
        String remoteUser = request.getRemoteUser();
        String fullname = accountService.getFullNameByUserName(remoteUser);
        if (modelAndView != null) {
            if (remoteUser != null && (request.isUserInRole("ADMIN") || request.isUserInRole("STAFF"))) {
                modelAndView.addObject("isAuthenticated", true);
                modelAndView.addObject("isAdminOrStaff", true);
                modelAndView.addObject("fullname", fullname);
            } else if (remoteUser != null) {
                modelAndView.addObject("fullname", fullname);
                modelAndView.addObject("isAuthenticated", true);
            } else {
                modelAndView.addObject("isAuthenticated", false);
                modelAndView.addObject("isAdminOrStaff", false);
            }
        }
    }
}
