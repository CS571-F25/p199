// AquariumView.jsx
import React from "react";
import { Card } from "react-bootstrap";
import waterGif from "../data/water_effect.gif";
import plants0 from "../data/plants0.png";
import plants1 from "../data/plants1.png";
import plants2 from "../data/plants2.png";
import plants3 from "../data/plants3.png";

export default function AquariumView({ children, plantLife, pressure }) {
  
    let plantImg = plants0;
    if (plantLife >= 75) plantImg = plants3;
    else if (plantLife >= 50) plantImg = plants2;
    else if (plantLife >= 25) plantImg = plants1;

    const p = Math.max(0, Math.min(100, pressure));

    const r = 30 * (1 - p / 100);
    const g = 110 * (1 - p / 100);
    const b = 180 * (1 - p / 100);

    const waterOpacity = 0.35 * (1 - p/100)
    const plantOpacity = (1 - p/130)

    return (
        <Card
        className="shadow-sm"
        style={{
            backgroundColor: `rgb(${r}, ${g}, ${b})`,
            borderRadius: 24,
            overflow: "hidden",
            height: 400,
            position: "relative"
        }}
        >
        <div
            style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${waterGif})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: waterOpacity,
            pointerEvents: "none",
            zIndex: 1,
            mixBlendMode: "screen"
            }}
        />

        <div
            style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${plantImg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: plantOpacity,
            pointerEvents: "none",
            zIndex: 0
            }}
        />

        <div
            style={{
            position: "absolute",
            inset: 0,
            padding: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2
            }}
        >
            <div
            style={{
                width: "100%",
                height: "100%",
                borderRadius: 18,
                boxShadow: "inset 0 0 40px rgba(0,0,0,0.7)",
                border: "3px solid rgba(65,255,223,0.4)",
                position: "relative"
            }}
            >
            {children}
            </div>
        </div>
        </Card>
    );
}
