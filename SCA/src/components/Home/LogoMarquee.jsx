import Marquee from "react-fast-marquee";

function LogoMarquee() {
  const logos = [
    "https://i.ibb.co.com/YBFCktMV/images.jpg",
    "https://i.ibb.co.com/YBFCktMV/images.jpg",
    "https://i.ibb.co.com/YBFCktMV/images.jpg",
    "https://i.ibb.co.com/YBFCktMV/images.jpg",
    "https://i.ibb.co.com/YBFCktMV/images.jpg",
    "https://i.ibb.co.com/YBFCktMV/images.jpg",
    "https://i.ibb.co.com/YBFCktMV/images.jpg",
    "https://i.ibb.co.com/YBFCktMV/images.jpg",
  ];

  return (
    <Marquee
      direction="right" // 👈 Left to Right
      speed={50}
      pauseOnHover={true}
      gradient={false}
    >
      {logos.map((logo, index) => (
        <img
          key={index}
          src={logo}
          alt={`logo-${index}`}
          style={{
            width: "120px",
            height: "auto",
            marginRight: "40px",
          }}
        />
      ))}
    </Marquee>
  );
}

export default LogoMarquee;
