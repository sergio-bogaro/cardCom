interface cardProps {
  cardTitle: string;
  quantity?: string;
}

const Card = ({ cardTitle, quantity = '' }: cardProps) => {
  return (
    <a href="">
      <div className="flex items-center gap-4 p-4 h-20 min-w-[250px] rounded-lg border-solid border-[1px] hover:bg-gray-600 border-gray-600 text-gray-400">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC_EDoIpIJoXuVGCh0GqemNFvbI-TR7tfB6w&usqp=CAU"
          className="rounded-full h-[60px]"
        />
        <div>
          <p className="font-normal text-xs">{cardTitle}</p>
          <strong className="text-gray-200 text-2xl">{quantity}</strong>
        </div>
      </div>
    </a>
  );
};

export default Card;
