import MainLayout from "../components/layout/MainLayout";

function DashboardPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <section>
          <h1 className="text-2xl font-bold">Job Dashboard</h1>
          <p className="text-sm text-gray-600">
            Track your applications and job search progress.
          </p>
        </section>

        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Dashboard content will go here.
          </p>
        </section>
      </div>
    </MainLayout>
  );
}

export default DashboardPage;
