import videoGameIcon from "../assets/video-game.svg";

function Header() {
  return (
    <header className="app-header">
      <img src={videoGameIcon} alt="Video Game Icon" />
      <h1>The Video Game Quiz</h1>
    </header>
  );
}

export default Header;
