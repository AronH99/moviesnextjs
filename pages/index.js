import Link from "next/link";
const index = () => {
  return (
    <>
      <Link href={`/movies`}>
        <button>Ga naar Movies</button>
      </Link>
    </>
  );
};

export default index;
