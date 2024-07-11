import React from "react";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ScholarshipNewest = () => {
  return (
    <div className="mx-auto max-w-7xl py-10 px-2 sm:px-6 lg:px-8">
      <div className="text-center">
        <Badge variant={"secondary"}>Terbaru</Badge>
        <h1 className="scroll-m-20 text-[#101828] text-3xl font-medium tracking-tight lg:text-4xl mt-5 mb-2">
          Beasiswa Terkini
        </h1>
        <p className="text-xl font-normal text-gray-500">
          Temukan berbagai beasiswa dari banyak penyelenggara beasiswa di sini
        </p>
      </div>

      <div className="mt-10 grid grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, index) => {
          return (
            <Link to={"/scholarship/1"} key={index}>
              <Card className="rounded-md hover:bg-gray-100">
                <CardHeader className="bg-blue-400 min-h-[200px] rounded-t-md">
                  <Badge variant={"secondary"} className="w-fit">
                    Terbaru
                  </Badge>
                </CardHeader>
                <CardContent>
                  <h4 className="scroll-m-20 text-xl font-bold">
                    Beasiswa Internusantara 2024
                  </h4>
                  <p className="text-sm font-normal text-gray-800 mt-2">
                    mattis rhoncus urna neque viverra justo nec ultrices dui
                    sapien eget mi
                  </p>
                  <p className="text-xs font-normal text-gray-500 mt-1">
                    Deadline •{" "}
                    <span className="text-blue-600 font-medium">
                      24 Desember 2024
                    </span>
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="flex justify-end mt-8 text-primary">
        <Link to={"#"} className="flex text-base font-medium">
          Lihat Beasiswa Terkini Lainnya <ArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default ScholarshipNewest;
