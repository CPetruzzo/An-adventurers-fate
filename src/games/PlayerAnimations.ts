import { Tween } from "tweedle.js";
import { StateAnimation } from "../utils/StateAnimation";

export class PlayerAnimations extends StateAnimation {
    private static readonly JUMP_ANIMATION_TIME = 1450;
    private static readonly PUNCH_ANIMATION_TIME = 550;
    private static readonly BOW_ANIMATION_TIME = 480;
    private static readonly JUMP_BOW_ANIMATION_TIME = 390;

    constructor() {
        
        super();
        this.scale.set(2);
        this.pivot.set(0.55, 17);

        this.addState(
            "run",
            [
                "adventurer-run2-00.png",
                "adventurer-run2-01.png",
                "adventurer-run2-02.png",
                "adventurer-run2-03.png",
                "adventurer-run2-04.png",
                "adventurer-run2-05.png",
            ],
            0.1,
            true
        );
        this.addState(
            "hurted",
            [
                "adventurer-knock-dwn-00.png",
                "adventurer-knock-dwn-01.png",
                "adventurer-knock-dwn-02.png",
                "adventurer-knock-dwn-03.png",
                "adventurer-knock-dwn-04.png",
                "adventurer-knock-dwn-05.png",
                "adventurer-knock-dwn-06.png",
            ],
            0.1,
            false
        );
        this.addState(
            "getUp",
            [
                "adventurer-get-up-00.png",
                "adventurer-get-up-01.png",
                "adventurer-get-up-02.png",
                "adventurer-get-up-03.png",
                "adventurer-get-up-04.png",
                "adventurer-get-up-05.png",
                "adventurer-get-up-06.png",
            ],
            0.1,
            false
        );
        this.addState(
            "punch",
            [
                "adventurer-punch-00.png",
                "adventurer-punch-01.png",
                "adventurer-punch-02.png",
                "adventurer-punch-03.png",
                "adventurer-punch-04.png",
                "adventurer-punch-05.png",
            ],
            0.1,
            true
        );
        this.addState(
            "runPunch",
            [
                "adventurer-run-punch-00.png",
                "adventurer-run-punch-01.png",
                "adventurer-run-punch-02.png",
                "adventurer-run-punch-03.png",
                "adventurer-run-punch-04.png",
                "adventurer-run-punch-05.png",
                "adventurer-run-punch-06.png",
            ],
            0.1,
            true
        );
        this.addState("idle", ["adventurer-walk-00.png"], 0.05, true);
        this.addState(
            "crawl",
            [
                "adventurer-crouch-walk-00.png",
                "adventurer-crouch-walk-01.png",
                "adventurer-crouch-walk-02.png",
                "adventurer-crouch-walk-03.png",
                "adventurer-crouch-walk-04.png",
                "adventurer-crouch-walk-05.png",
            ],
            0.1,
            true
        );
        this.addState(
            "jump",
            [
                "adventurer-drop-kick-00.png",
                "adventurer-drop-kick-01.png",
                "adventurer-drop-kick-02.png",
                "adventurer-drop-kick-03.png",
            ],
            0.025,
            false
        );
        this.addState(
            "bow",
            [
                "adventurer-bow-00.png",
                "adventurer-bow-01.png",
                "adventurer-bow-02.png",
                "adventurer-bow-03.png",
                "adventurer-bow-04.png",
                "adventurer-bow-05.png",
                "adventurer-bow-06.png",
                "adventurer-bow-07.png",
                "adventurer-bow-08.png",
            ],
            0.1,
            true
        );
        this.addState(
            "chargebow",
            [
                "adventurer-bow-00.png",
                "adventurer-bow-01.png",
                "adventurer-bow-02.png",
                "adventurer-bow-03.png",
                "adventurer-bow-04.png",
                "adventurer-bow-05.png",
            ],
            0.1,
            true
        );
        this.addState(
            "chargedbow",
            ["adventurer-bow-04.png", "adventurer-bow-05.png"],
            0.1,
            true
        );
        this.addState(
            "shootingbow",
            [
                "adventurer-bow-06.png",
                "adventurer-bow-07.png",
                "adventurer-bow-08.png",
            ],
            0.1,
            true
        );
        this.addState(
            "jumpBow",
            [
                "adventurer-bow-jump-00.png",
                "adventurer-bow-jump-01.png",
                "adventurer-bow-jump-02.png",
                "adventurer-bow-jump-03.png",
                "adventurer-bow-jump-04.png",
                "adventurer-bow-jump-05.png",
            ],
            0.1,
            true
        );
    }

    public jump(): void {
        this.playState("jump", true);
        new Tween(this)
            .to({}, PlayerAnimations.JUMP_ANIMATION_TIME)
            .start()
            .onComplete(() => {
                this.playState("idle", true);
            });
    }

    public punch(): void {
        this.playState("punch");
        new Tween(this)
            .to({}, PlayerAnimations.PUNCH_ANIMATION_TIME)
            .start()
            .onComplete(() => {
                this.playState("idle", true);
            });
    }

    public bow(): void {
        this.playState("bow");
        new Tween(this)
            .to({}, PlayerAnimations.BOW_ANIMATION_TIME)
            .start()
            .onComplete(() => {
                this.playState("idle", true);
            });
    }

    public jumpBow(): void {
        this.playState("jumpBow");
        new Tween(this)
            .to({}, PlayerAnimations.JUMP_BOW_ANIMATION_TIME)
            .start()
            .onComplete(() => {
                this.playState("idle", true);
            });
    }

    public hurted(): void {
        this.playState("hurted");
    }

    public getUp(): void {
        this.playState("getUp");
    }

    public run(): void {
        this.playState("run", true);
    }

    public idle(): void {
        this.playState("idle", true);
    }

    public crawl(): void {
        this.playState("crawl", true);
    }

    public runPunch(): void {
        this.playState("runPunch", true);
    }

    public chargedBow(): void {
        this.playState("chargedbow");
    }

    public chargeBow(): void {
        this.playState("chargebow");
    }

    public shootingBow(): void {
        this.playState("shootingbow");
    }
}
