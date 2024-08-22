# Crowdfunding

Crowdfunding platform on Solana ⚡️ enabling fundraisers to raise globally with negligible transaction fees. The campaigns support custom card format & can be embedded into websites 🌐

# Building and deploying with Anchor

Anchor simplifies the intricacies of deploying Solana programs through its two pivotal commands - anchor build and anchor deploy. These commands act as the backbone of the development process, facilitating the compilation and deployment of programs onto the Solana network seamlessly.

```
anchor build
anchor deploy
```

# Updating the program ID
After deploying your program initially using anchor build and anchor deploy, it becomes crucial to update the program ID to ensure a consistent and accurate identifier across various configurations and files within your Solana project.

During the initial deployment, a new key pair is generated, containing a public address necessary for your program’s identification. However, this public address is not readily known right after deployment. You can obtain it using the following Solana command:

```
$ solana address -k target/deploy/crowdfunding-keypair.json 
8AsotfHa32iNgnuKwTF9bsHct9bhCKa1dptkqJjmJzPN

```


