import PaymentSummary from "@/components/payment-summary";
import Head from "next/head";
import { useRouter } from "next/router";

const PaymentSummaryPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Head>
        <title>Payment</title>
      </Head>
      <PaymentSummary trip_id={id as string} />
    </>
  );
};

export default PaymentSummaryPage;
