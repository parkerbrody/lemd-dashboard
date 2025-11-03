import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";
import API_BASE_URL from "../config";

const TopicByFeature = ({ feature }) => {
  const svgRef = useRef();
  const [words, setWords] = useState([]);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/wordcloud?feature=${feature || "sentiment"}`);
        const data = await res.json();
        if (data.status === "ok") setWords(data.words);
        else setWords([]);
      } catch (err) {
        console.error("Error fetching wordcloud:", err);
        setWords([]);
      }
    };
    fetchWords();
  }, [feature]);

  useEffect(() => {
    if (!words || words.length === 0) return;
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove();

    const width = 300;
    const height = 180;

    const layout = cloud()
      .size([width, height])
      .words(words.map((d) => ({ ...d, size: d.value * 2 })))
      .padding(3)
      .rotate(() => (Math.random() > 0.5 ? 0 : 90))
      .font("sans-serif")
      .fontSize((d) => d.size)
      .on("end", draw);

    layout.start();

    function draw(words) {
      const group = svgEl
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      group
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", (d) => `${d.size}px`)
        .style("fill", (d, i) => {
          const scale = d3.scaleSequential(d3.interpolateRdYlGn)
            .domain([0, words.length]);
          return d.color || scale(i);
        })
        .style("font-weight", 600)
        .attr("text-anchor", "middle")
        .attr("transform", (d) => `translate(${d.x},${d.y})rotate(${d.rotate})`)
        .text((d) => d.text);
    }
  }, [words]);

  return (
    <div
      style={{
        display: "flex",
        background: "white",
        borderRadius: "0px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        overflow: "hidden",
        minHeight: "220px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Left caption */}
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
        <h3 style={{ marginBottom: "10px", fontSize: "14px", letterSpacing: "0.5px" }}>
          BY TOPIC
        </h3>
        <p style={{ fontSize: "13px", lineHeight: "1.4", margin: 0 }}>
          Monitor {feature || "feature"} by topic.
        </p>
      </div>

      {/* Right chart */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <h2 style={{ fontWeight: "700", marginBottom: "5px" }}>
          {feature ? feature.toUpperCase() : "FEATURE"} BY TOPIC
        </h2>
        <svg ref={svgRef} width={300} height={180}></svg>
      </div>
    </div>
  );
};

export default TopicByFeature;
