import { CheckCircle } from "lucide-react";
import React from "react";
import { Button } from "../../ui/button";

const HeroSection = () => {
  const benefits = [
    "Mudah dan gratis untuk digunakan!",
    "Data tersimpan aman",
    "Tidak ada batasan kuota pendaftar",
  ];
  return (
    <div className="pt-20 pl-20 grid grid-cols-2">
      <div className="grid grid-cols-1 place-content-center p-5">
        <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl">
          Unggah dan proses calon penerima beasiswa Anda, Gratis!
        </h1>
        <div className="mt-5 pl-5 space-y-2">
          {benefits.map((val, index) => {
            return (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="w-7 h-7 text-primary" />
                <p className="text-lg font-normal text-gray-500">{val}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-10 space-x-4">
          <Button size={"lg"} variant={"outline"}>
            Pelajari Lebih Lanjut
          </Button>
          <Button size={"lg"}>Daftar Sekarang</Button>
        </div>
      </div>
      <div
        className="bg-cover rounded-ss-md min-h-[760px]"
        style={{ backgroundImage: "url('/assets/hero.png')" }}
      ></div>
    </div>
  );
};

export default HeroSection;
