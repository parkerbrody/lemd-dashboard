import React from "react";
import { motion } from "framer-motion";

const EngagementSnapshot = ({ data, loading, error }) => {
  const value = loading || !data ? 0 : data.current ?? 0;
  const size = 200;
  const thickness = 20;
  const radius = size / 2;
  const innerRadius = radius - thickness - 10;
  const targetRotation = -90 + (value * 180) / 100;

  const describeArc = (startAngle, endAngle) => {
    const polarToCartesian = (r, angle) => ({
      x: radius + r * Math.cos((angle * Math.PI) / 180),
      y: radius - r * Math.sin((angle * Math.PI) / 180),
    });
    const start = polarToCartesian(radius, endAngle);
    const end = polarToCartesian(radius, startAngle);
    return `M ${start.x} ${start.y}
            A ${radius} ${radius} 0 0 0 ${end.x} ${end.y}
            L ${radius} ${radius}
            Z`;
  };

  return (
    <div
      style={{
        display: "flex",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        overflow: "visible",
        minHeight: "220px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Left panel */}
      <div
        style={{
          backgroundColor: "#1e3558",
          color: "white",
          padding: "24px",
          width: "30%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h3 style={{ marginBottom: "10px", fontSize: "14px" }}>
          OVERALL ENGAGEMENT
        </h3>
        <p style={{ fontSize: "13px", lineHeight: "1.4", margin: 0 }}>
          View overall engagement or drill down into the core drivers.
        </p>
      </div>

      {/* Right gauge area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "10px 0",
          color: "#1e3558",
        }}
      >
        <h2 style={{ fontWeight: 700, marginBottom: "10px" }}>
          ENGAGEMENT SNAPSHOT
        </h2>

        <div
          style={{
            position: "relative",
            width: size,
            height: size / 2,
            overflow: "visible",
          }}
        >
          <svg width={size} height={size / 2} viewBox={`0 0 ${size} ${size / 2}`}>
            {/* Colored arcs */}
            <path d={describeArc(180, 135)} fill="#c74a3a" />
            <path d={describeArc(135, 90)} fill="#c6933a" />
            <path d={describeArc(90, 45)} fill="#d1b243" />
            <path d={describeArc(45, 0)} fill="#6d9b6b" />

            {/* Mask */}
            <path
              d={`
                M ${radius - innerRadius} ${radius}
                A ${innerRadius} ${innerRadius} 0 0 1 ${radius + innerRadius} ${radius}
                L ${radius + innerRadius} ${radius + thickness * 0.7}
                L ${radius - innerRadius} ${radius + thickness * 0.7}
                Z
              `}
              fill="white"
            />
          </svg>

          {/* Needle */}
          {!loading && !error && (
            <motion.div
              initial={{ rotate: -90 }}
              animate={{ rotate: targetRotation }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              style={{
                position: "absolute",
                bottom: 0,
                left: "47.5%",
                width: "10px",
                height: radius - 15,
                background:
                  "linear-gradient(to top, #333 15%, #555 70%, #777 100%)",
                clipPath: "polygon(50% 6%, 82% 100%, 18% 100%)",
                borderRadius: "2px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                transformOrigin: "bottom center",
                zIndex: 3,
              }}
            />
          )}

          {/* Pivot */}
          <div
            style={{
              position: "absolute",
              bottom: "-10px",
              left: "calc(50% - 10px)",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: "radial-gradient(circle at 30% 30%, #666, #222)",
              boxShadow: "0 2px 5px rgba(0,0,0,0.4)",
              zIndex: 4,
            }}
          />

          {/* Loading / Error */}
          {loading && (
            <div
              style={{
                position: "absolute",
                top: "40%",
                left: 0,
                right: 0,
                color: "#8c7732",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              Loading...
            </div>
          )}
          {error && (
            <div
              style={{
                position: "absolute",
                top: "40%",
                left: 0,
                right: 0,
                color: "red",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              Failed to load
            </div>
          )}
        </div>

        <div
          style={{
            marginTop: "20px",
            color: "#8c7732",
            fontWeight: 400,
            fontSize: "13px",
            textAlign: "center",
            width: size,
          }}
        >
          Current engagement:{" "}
          <span style={{ fontWeight: 600, color: "#1e3558" }}>
            {Math.round(value)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default EngagementSnapshot;
