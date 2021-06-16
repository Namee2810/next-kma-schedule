import Schedule from "components/common/Schedule";
import HomeLayout from "layouts/HomeLayout";

export default function Home() {
  return (
    <HomeLayout title="KMA | Thời khóa biểu">
      <Schedule />
    </HomeLayout>
  )
}