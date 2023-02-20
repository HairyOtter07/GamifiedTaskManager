type Quest = {
    id: string,
    title: string,
    description: string,
    categories: string[],
    reward: number,
    active: boolean,
    status: QuestStatus
};

type QuestStatus = "unstarted" | "started" | "complete";