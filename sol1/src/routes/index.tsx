import Counter from "~/components/Counter";
import "./index.css";
import pirateImage from "~/components/pirate.jpeg"; // Ensure the path is correct

export default function Home() {
  return (
    <main>
      <h1>kaizkoku!</h1>
      <Counter />
      <p>
        Visit{" "}
        <a href="https://github.com/karolsudol/kaizoku" target="_blank">
          <img src={pirateImage} alt="Kaizoku" class="responsive-image" />
        </a>{" "}
        to learn how to build Solana - Solid apps.
      </p>
    </main>
  );
}
