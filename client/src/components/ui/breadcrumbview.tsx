import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";

type BreadcrumbType = {
  name: string;
  href: string;
  isActive?: boolean;
};
export function BreadcrumbView({ pages }: { pages: BreadcrumbType[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pages?.map((val: BreadcrumbType, index: number) => {
          return (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link to={val.href}>{val.name}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {pages.length - 1 !== index ? <BreadcrumbSeparator /> : null}
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
