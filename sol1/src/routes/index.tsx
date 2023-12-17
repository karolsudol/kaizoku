import CheckBalance from "~/components/CheckBalance";
import Counter from "~/components/Counter";
import pirateImage from "~/components/pirate.jpeg";
import "./index.css";

export default function Home() {
  return (
    <main>
      <h1>kaizkoku!</h1>
      <Counter />
      <CheckBalance /> {/* Add this line */}
      <p>
        Visit <a href="https://github.com/karolsudol/kaizoku" target="_blank">
          <img src={pirateImage} alt="Kaizoku" class="responsive-image" />
        </a> Solana - Solid apps.
      </p>
    </main>
  );
}
