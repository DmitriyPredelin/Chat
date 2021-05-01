import { SeaBattleWindow } from "../components/sea-battle/sea-battle-window";

export const SeaBattlePage = () => {
    return (
        <div className="sea-battle_main">
            <SeaBattleWindow affil={1} />
            <SeaBattleWindow affil={2} />
        </div>
    )
}