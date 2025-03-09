"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import { BentoGridThirdDemo } from "../components/header-bento";
import Stripe from "../components/Stripe";
import { TimerContainer } from "../components/ui/TimeContainer";

import Starfield from "../components/Starfield";

import {
  FaTwitter,
  FaInstagram,
  FaDiscord,
  FaTelegram,
  FaFacebook,
} from "react-icons/fa";

import ModelComponent from "@/components/planet/Model";
import { TypewriterEffectSmoothDemo } from "@/components/typewriter-demo";

export default function Home() {
  const [paymentType, setPaymentType] = useState("");
  const togglePaymentType = (type: string) => {
    setPaymentType(type);
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-2 bg-transparent w-full"
      style={{ padding: "calc(2rem + 1px)", zIndex: -1 }}
    >
      <Starfield
        starCount={4000}
        starColor={[255, 255, 255]}
        speedFactor={0.05}
        backgroundColor="black"
      />

      <Image src="/galaxy.png" width={300} height={300} alt="xggs logo" />
      <TypewriterEffectSmoothDemo
        words={[
          {
            text: "Play",
          },
          {
            text: "the",
          },
          {
            text: "best",
          },
          {
            text: "game",
          },
          {
            text: "in",
          },
          {
            text: "the",
          },
          {
            text: "galaxy!",
            className: "text-blue-500 dark:text-blue-500",
          },
        ]}
      />

      {/* <TimerContainer
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      /> */}
      <div className="mt-8 mb-1 text-center flex flex-col lg:flex-row">
        <a
          // href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Play Planet Spin{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-1 max-w-[30ch] text-sm opacity-50`}>
            The first FIAT and WEB3 integrated lottery game in the galaxy!
          </p>
        </a>

        <a
          // href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            How it works ?{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Each ticket goes into the prize pool and the daily winner takes it
            all!
          </p>
        </a>

        <a
          // href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Daily Prizes{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Each day at 10:00 GMT we will draw a winner which will collect the
            entire prize!
          </p>
        </a>

        <a
          // href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Coming soon...{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
            Token, NFTs and other merchandise supporting our idea!
          </p>
        </a>
      </div>

      <h1 className="m-2 p-2" style={{ fontSize: 28 }}>
        Select payment option:
      </h1>

      <div className="flex flex-row justify-between space-x-4">
        <button
          className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm"
          style={{
            opacity: paymentType === "card" ? 0.5 : 1,
            cursor: paymentType === "card" ? "not-allowed" : "pointer",
          }}
          onClick={() => togglePaymentType("card")}
          disabled={paymentType === "card"}
        >
          Card
        </button>
        <button
          className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm"
          style={{
            opacity: paymentType === "crypto" ? 0.5 : 1,
            cursor: paymentType === "crypto" ? "not-allowed" : "pointer",
          }}
          onClick={() => togglePaymentType("crypto")}
          disabled={paymentType === "crypto"}
        >
          Crypto
        </button>
      </div>
      {paymentType === "crypto" && (
        <div className="flex flex-row mt-8">
          <div className="flex flex-col">
            <div style={{ zIndex: 1 }} className="p-2 flex flex-row">
              <img src="/solana-sol-logo.svg" alt="Solana Logo" width={25} />
              <Link
                href="https://solscan.io/account/GvohhLDaBwfNYbujY82jsvwUKwLLmTm6dMVEetg1yuaK"
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginLeft: 5, marginTop: 6 }}
              >
                Go to Solscan
              </Link>
            </div>
          </div>

          <div className="ml-6 p-6">
            <w3m-button label="Donate and Spin!"></w3m-button>
          </div>
        </div>
      )}
      {paymentType === "card" && (
        <div className="mt-4">
          <Stripe />
        </div>
      )}

      <div className="mt-5">
        <ModelComponent url="/models/Planet3.glb" />
      </div>

      <div style={{ zIndex: 1 }}></div>

      <div className="p-4">
        <BentoGridThirdDemo />
      </div>
      <div className="mt-6 mb-6" style={{ zIndex: 1 }}>
        <h1 className="mt-4">Follow us on social media and other platforms:</h1>
      </div>
      <div
        className="flex justify-between space-x-4 mt-6 mb-6"
        style={{ zIndex: 1 }}
      >
        <FaTwitter size={50} />
        <FaInstagram size={50} />
        <FaDiscord size={50} />
        <FaTelegram size={50} />
        <FaFacebook size={50} />
      </div>
    </main>
  );
}
