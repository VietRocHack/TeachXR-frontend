/* eslint-disable react/prop-types */
export default function ConfirmationBox({ accept, reject, url }) {
  return (
    <>
      <div>
        <img src={url}></img>
        <button onClick={accept}>Accept</button>
        <button onClick={reject}>Reject</button>
      </div>
    </>
  );
}
