## SSL Pinning write up

### What is it?
This is the technique that allows dev to embed the key (whether it's a certificate, the public key, hash, etc.) within the code. This embedded string is used to being compared to the key received from server during HTTPS handshake.

### Why and how?
To prevent the Man-in-the-middle attack. Which means that even if there's a false certificate along the way (during the handshake) we still compare the final key to the original we expect and prevent the connection if no match is found.

**How (in implementation details)?**
<br/>At least in React Native the best (most efficient when it comes to support and dev experience) way is to implement the SSL Pinning on the native side of both platforms (iOS and Android).
One way is to use ready modules (OKHttp is already included with the react native for Android, for iOS there is TrustKit, other packages are hard to find as blogs usually copy one from another, so if there's TrustKit referenced by one, other will reference this only one as well...).<br/>
Other way is to embed the string and when handling the handshake (manually) compare it. However, I wouldn't really go that way.

### Pros
* Security in general
* Easy and simple when it comes to implementation

### Cons
* Complicates the maintenance of the code and application
* The key will expire pretty soon anyway and will require update
* otherwise will lead to lack of connection causing frustrated users.
* Is vulnerable for catching the key
(Reverse engineering the code, etc.)

There are, however, ways to prevent getting the key by various code securing techniques.
