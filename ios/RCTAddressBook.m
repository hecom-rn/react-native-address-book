//
//  RCTAddressBook.h
//  RCTAddressBook
//
//  Created by Hecom on 15/06/2020/6/17.
//

#import "RCTAddressBook.h"
#import <ContactsUI/ContactsUI.h>
@interface RCTAddressBook()<CNContactPickerDelegate>

@property(nonatomic, copy) RCTPromiseResolveBlock _resolve;
@property(nonatomic, copy) RCTPromiseRejectBlock _reject;

@end


@implementation RCTAddressBook


RCT_EXPORT_MODULE(ContactsWrapper);

RCT_EXPORT_METHOD(getContact:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  self._resolve = resolve;
  self._reject = reject;
  
  [self launchContacts];
}


-(void) launchContacts {
  CNAuthorizationStatus status = [CNContactStore authorizationStatusForEntityType:CNEntityTypeContacts];
  if (status == CNAuthorizationStatusNotDetermined) {
    CNContactStore *store = [[CNContactStore alloc] init];
    [store requestAccessForEntityType:CNEntityTypeContacts completionHandler:^(BOOL granted, NSError * _Nullable error) {
      if (error) {
        [self unauthorized];
      }else {
        [self presentVC];
      }
    }];
  }
  
  if (status == CNAuthorizationStatusAuthorized) {//有权限时
    [self presentVC];
  } else {
    [self unauthorized];
  }
}

-(void)presentVC {
  dispatch_async(dispatch_get_main_queue(), ^{
    CNContactPickerViewController *picker = [[CNContactPickerViewController alloc] init];
    picker.delegate = self;
    UIViewController *root = [[[UIApplication sharedApplication] delegate] window].rootViewController;
    BOOL modalPresent = (BOOL) (root.presentedViewController);
    if (modalPresent) {
      UIViewController *parent = root.presentedViewController;
      [parent presentViewController:picker animated:YES completion:nil];
    } else {
      [root presentViewController:picker animated:YES completion:nil];
    }
  });
}


#pragma mark - RN Promise Events

- (void)pickerCancelled {
  self._reject(@"E_CONTACT_CANCELLED", @"Cancelled", nil);
}

- (void)unauthorized {
  self._reject(@"E_CONTACT_UNAUTHORIZED", @"Unauthorized", nil);
}


-(void)contactPicked:(NSDictionary *)contactData {
  self._resolve(contactData);
}

- (NSMutableDictionary *) emptyContactDict {
  return @{
    @"name": @"",
    @"phone": @[].mutableCopy
  }.mutableCopy;
}

-(NSString *) getFullNameForGiven:(NSString *)gName middle:(NSString *)mName Family:(NSString *)fName {
  NSArray *names = [NSArray arrayWithObjects:fName, mName, gName, nil];
  return [names componentsJoinedByString:@""];
}

- (void)contactPicker:(CNContactPickerViewController *)picker didSelectContact:(CNContact *)contact {
  NSMutableDictionary *contactData = [self emptyContactDict];

  NSString *fullName = [self getFullNameForGiven:contact.givenName middle:contact.middleName Family:contact.familyName];
  NSArray *phoneNos = contact.phoneNumbers;

  [contactData setValue:fullName forKey:@"name"];

  if([phoneNos count] > 0) {
    NSMutableArray *phoneArrM = [[NSMutableArray alloc] init];
    for (CNLabeledValue *labeledValue in phoneNos) {
      CNPhoneNumber *phone = labeledValue.value;
      NSString *phoneStr = phone.stringValue;
      NSString *pureNumbers = [[phoneStr componentsSeparatedByCharactersInSet:[[NSCharacterSet characterSetWithCharactersInString:@"0123456789"] invertedSet]] componentsJoinedByString:@""];
      [phoneArrM addObject:pureNumbers];
    }
    [contactData setValue:phoneArrM forKey:@"phone"];
  }

  [self contactPicked:contactData];
}

- (void)contactPickerDidCancel:(CNContactPickerViewController *)picker {
  [self pickerCancelled];
}
@end

