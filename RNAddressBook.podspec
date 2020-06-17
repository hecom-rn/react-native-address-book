require 'json'

package = JSON.parse(File.read(File.join(__dir__, './package.json')))

Pod::Spec.new do |s|
  s.name           = "RNAddressBook"
  s.version        = package['version']
  s.summary        = "React native address book"
  s.description    = "React native address book"
  s.license        = package['license']
  s.author         = package['author']
  s.homepage       = "https://github.com/hecom-rn/react-native-address-book.git"
  s.source       = { :git => "https://github.com/hecom-rn/react-native-address-book.git", :tag => s.version }
  s.source_files  = "ios/**/*.{h,m}"
  s.platform      = :ios, "9.0"

  s.dependency 'React'
end
