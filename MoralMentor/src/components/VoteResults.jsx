const VoteResults = ({ votes }) => {
    const totalVotes = votes.yes + votes.no;
    const yesPercentage = totalVotes ? ((votes.yes / totalVotes) * 100).toFixed(1) : 0;
    const noPercentage = totalVotes ? ((votes.no / totalVotes) * 100).toFixed(1) : 0;
  
    return (
      <div className="mt-4 bg-purple-200 p-4 rounded-lg shadow-md w-full">
        <h3 className="text-lg font-semibold text-gray-900">Live Voting Results</h3>
        <div className="mt-2">
          <div className="mb-2">
            <span className="block font-medium text-gray-800">Yes: {yesPercentage}%</span>
            <div className="w-full bg-gray-300 rounded-md">
              <div
                className="bg-green-500 h-3 rounded-md"
                style={{ width: `${yesPercentage}%` }}
              ></div>
            </div>
          </div>
          <div>
            <span className="block font-medium text-gray-800">No: {noPercentage}%</span>
            <div className="w-full bg-gray-300 rounded-md">
              <div
                className="bg-red-500 h-3 rounded-md"
                style={{ width: `${noPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default VoteResults;
  