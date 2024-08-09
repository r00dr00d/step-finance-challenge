# step-finance-exercise

## Example
<img width="1440" alt="Screenshot 2024-08-08 at 23 00 18" src="https://github.com/user-attachments/assets/8e9b543e-4178-4dcf-bddf-43d69d05ef11">
<img width="1440" alt="Screenshot 2024-08-08 at 23 00 12" src="https://github.com/user-attachments/assets/e52d5989-09cc-4f52-ab03-213f5e2ed1b1">
<img width="1440" alt="Screenshot 2024-08-08 at 22 59 57" src="https://github.com/user-attachments/assets/43973419-8cd1-47f3-ab88-68b590292816">


### Prerequisites

- Node v18.18.0 or higher

- Rust v1.77.2 or higher
- Anchor CLI 0.30.0 or higher
- Solana CLI 1.18.9 or higher

### Installation

#### Clone the repo

```shell
git clone <repo-url>
cd <repo-name>
```

#### Install Dependencies

```shell
npm install
```

#### Start the web app

```
npm run dev
```

## Apps

### anchor

This is a Solana program written in Rust using the Anchor framework.

#### Commands

You can use any normal anchor commands. Either move to the `anchor` directory and run the `anchor` command or prefix the command with `npm run`, eg: `npm run anchor`.

#### Sync the program id:

Running this command will create a new keypair in the `anchor/target/deploy` directory and save the address to the Anchor config file and update the `declare_id!` macro in the `./src/lib.rs` file of the program.

You will manually need to update the constant in `anchor/lib/counter-exports.ts` to match the new program id.

```shell
npm run anchor keys sync
```

#### Build the program:

```shell
npm run anchor-build
```

#### Start the test validator with the program deployed:

```shell
npm run anchor-localnet
```

#### Run the tests

```shell
npm run anchor-test
```

#### Deploy to Devnet

```shell
npm run anchor deploy --provider.cluster devnet
```

### web

This is a React app that uses the Anchor generated client to interact with the Solana program.

#### Commands

Start the web app

```shell
npm run dev
```

Build the web app

```shell
npm run build
```
