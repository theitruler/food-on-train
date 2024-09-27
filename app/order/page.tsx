import PNRForm from '../../components/pnr-form'

export default function OrderPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Order Food on Train</h1>
      <PNRForm />
    </main>
  )
}