export default function WeatherDashboard({ title, children }) {
  return (
    <>
      <h2>{title}</h2>
      {children}
    </>
  );
}
