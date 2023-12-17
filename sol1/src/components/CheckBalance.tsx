import { createSignal } from "solid-js";
import { checkBalance } from "~/solana/balance"; // Adjust the import path as needed

export default function CheckBalance() {
    const [publicKey, setPublicKey] = createSignal('');
    const [balance, setBalance] = createSignal<number | null>(null);

    async function handleCheckBalance() {
        const balanceResult = await checkBalance(publicKey());
        setBalance(() => balanceResult); // Updated this line
    }

    return (
        <div>
            <input type="text" value={publicKey()} onInput={(e) => setPublicKey(e.currentTarget.value)} placeholder="Enter Public Key" />
            <button onClick={handleCheckBalance}>Check Balance</button>
            {balance() !== null && <p>Balance: {balance()} SOL</p>}
        </div>
    );
}
