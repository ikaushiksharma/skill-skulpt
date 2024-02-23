import Image from "next/image";
import { DollarSign, Users, CreditCard, Activity, Trophy } from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/Card";
import BarChart from "@/components/BarChart";
import SalesCard from "@/components/SalesCard";
import { getAuthSession } from "@/lib/auth";
import axios from "axios";
import { redirect } from "next/navigation";

const cardData: CardProps[] = [
  {
    label: "Total Revenue",
    amount: "$45,231.89",
    discription: "+20.1% from last month",
    icon: DollarSign,
  },
  {
    label: "Subscriptions",
    amount: "+2350",
    discription: "+180.1% from last month",
    icon: Users,
  },
  {
    label: "Sales",
    amount: "+12,234",
    discription: "+19% from last month",
    icon: CreditCard,
  },
  {
    label: "Active Now",
    amount: "+573",
    discription: "+201 since last hour",
    icon: Activity,
  },
];

type BarChartProps = { name: string; total: number[] };

async function getData(id: string) {
  axios.defaults.baseURL =process.env.NEXTAUTH_URL;
  try {
    const { data } = await axios.get(`/api/user/${id}`);
    return data;
  } catch (error) {
    console.error("ERROR", error);
    return null;
  }
}

export default async function Home() {
  const session = await getAuthSession();
  if (!session) redirect("/gallery");
  const name = session?.user.name;
  console.log("i am here", session?.user.id);
  const { user, userProgress } = await getData(session?.user.id);
  console.log("RESPONSE", userProgress);

  let firstName = "User";
  if (name) {
    firstName = name.split(" ")[0];
  }
  return (
    <div className="flex flex-col gap-5  mx-auto max-w-7xl">
      <h1 className="text-2xl font-semibold">{firstName}&apos;s Dashboard</h1>
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((d, i) => (
          <Card
            key={i}
            amount={d.amount}
            discription={d.discription}
            icon={d.icon}
            label={d.label}
          />
        ))}
      </section>
      <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <section className="pb-6 text-lg">
            <p>Course Progress</p>
            <p className="text-base text-gray-400">
              You are currently enrolled in {userProgress.length} courses
            </p>
          </section>
          <BarChart data={userProgress} />
        </CardContent>
        <CardContent className="flex gap-4">
          <section className="pb-6 text-lg">
            <p>Generated Courses</p>
            <p className="text-base text-gray-400">
              You have generated {user.courses.length} courses. Keep it up!
            </p>
          </section>
          {user.courses.map((d: any, i: number) => (
            <SalesCard key={i} id={d.id} name={d.name} saleAmount={d.totalChapters} />
          ))}
        </CardContent>

        {/*  */}
      </section>
    </div>
  );
}
