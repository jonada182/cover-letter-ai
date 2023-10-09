import React from "react"

type Props = {
  loading?: boolean
}

const loadingMessages = [
  "Summoning the job genie... Please hold your wishes! 🧞",
  "Cover letters or magic spells? Brewing both... ✨📝",
  "Hiring the AI elves... They're quicker than you'd think! 🧝‍♂️",
  "Loading magic potions for job hunting success! 🍾🔮",
  "Putting on our best digital suit... Be right with you! 👔🤖",
  "The job oracle is gazing into the future... 🔮✨",
  "Our AI is writing, rewriting... and not using clichés! 🤖🖋️",
  "Gathering the best words... to make you the best candidate! 🌟",
  "Casting a job-seeking spell... Fingers crossed for no frogs! 🐸✨",
  "Unleashing the job-hunting dragon! Hope it's trained... 🐉🔥"
];

const getLoadingMessage = (): string => {
  return loadingMessages[Math.floor(Math.random() * loadingMessages.length)]
}

const PageLoading = (props: Props) => {
  if (props.loading) {
    return (
      <div className="flex place-items-center gap-4 px-6 py-4 text-gray-600 mb-4 animate-pulse">
        <p>{props.loading && getLoadingMessage()}</p>
      </div>
    )
  }
}

export default PageLoading
