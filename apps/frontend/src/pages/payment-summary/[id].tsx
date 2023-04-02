import PaymentSummary from "@/components/payment-summary";
import Head from "next/head";
import { useRouter } from "next/router";

const PaymentSummaryPage = () => {
  const router = useRouter();
  const id = router.query?.id;

  if (!id) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Payment</title>
      </Head>
      <PaymentSummary booking_id={Number(id)} />
    </>
  );
};

export default PaymentSummaryPage;
