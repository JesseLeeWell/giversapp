/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

//
//  AppDelegate.m
//  helloworld
//
//  Created by ___FULLUSERNAME___ on ___DATE___.
//  Copyright ___ORGANIZATIONNAME___ ___YEAR___. All rights reserved.
//

#import "AppDelegate.h"
#import "MainViewController.h"
#import "Branch/Branch.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions
{
    self.viewController = [[MainViewController alloc] init];
    // if you are using the TEST key
    [Branch setUseTestBranchKey:YES];
    // for debug and development only
    //[[Branch getInstance] setDebug];
    // listener for Branch Deep Link data
    [[Branch getInstance] initSessionWithLaunchOptions:launchOptions andRegisterDeepLinkHandler:^(NSDictionary * _Nonnull params, NSError * _Nullable error) {
        // do stuff with deep link data (nav to page, display content, etc)
        //NSLog(@"%@", params);
        if(!error){
            //if([[params objectForKey:@"pets"] isEqual:@"nala_luna"]){
            if([params objectForKey:@"page"]){
                //NSLog(@"%@", [params objectForKey:@"page"]);
                if ([self.viewController.webView isKindOfClass:[UIWebView class]]) {
                    //NSURLRequest *request = [(UIWebView*)self.viewController.webView request];
                    NSString *url = @"https://giverapp.continuetogive.com/";
                    NSString *fullUrl = [url stringByAppendingString:[params objectForKey:@"page"]];
                    NSLog(@"%@", fullUrl);
                    NSString *javascript = [NSString stringWithFormat:@"changeUrl(\"%@\")", fullUrl];
                    
                    [(UIWebView*)self.viewController.webView stringByEvaluatingJavaScriptFromString:javascript];
                }
            }
        }
    }];
    return [super application:application didFinishLaunchingWithOptions:launchOptions];
}



- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
    [[Branch getInstance] application:app openURL:url options:options];
    return YES;
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler {
    // handler for Universal Links
    [[Branch getInstance] continueUserActivity:userActivity];
    return YES;
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
    // handler for Push Notifications
    [[Branch getInstance] handlePushNotification:userInfo];
}

@end
