/** Puts the product type on its own line, as in the design: "XX59" / "Headphones". */
export function ProductName({ name }: { name: string }) {
  const match = /^(.*)\s(Headphones|Speaker|Earphones)$/i.exec(name);
  if (!match) return <>{name}</>;
  return (
    <>
      {match[1]}
      <br />
      {match[2]}
    </>
  );
}
