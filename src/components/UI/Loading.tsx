interface Props {
  isLoading: boolean;
}

export function Loading({ isLoading }: Props) {
  if (!isLoading) return null;

  return (
    <div
      id="wrapper"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 text-black backdrop-blur-sm">
      <div className="h-14 w-14 animate-spin">
        <div className="h-full w-full rounded-[50%] border-4 border-t-blue-500"></div>
      </div>
    </div>
  );
}
