<script>
    import { zdToast } from "../js/zdToast";
    import { fly } from "svelte/transition";
    import { onMount } from "svelte";

    let currentcolor = "#BAEEE5";
    let status = ["PENDING", "DONE", "DELETED"];
    let colors = ["#BAEEE5", "#DFC5E8", "#CBF2B8", "#FFFAB0", "#F5C1C1"];
    let datas = [];
    let text = "";
    let datasFromLS = JSON.parse(localStorage.getItem("datas"));
    onMount(() => {
        datas = datasFromLS == null ? [] : datasFromLS;
    });

    const addToDo = () => {
        if (text && text.length > 0) {
            zdToast("TODO added successfully", 1);
            let id =
                datas && datas.length > 0 ? datas[datas.length - 1].id + 1 : 1;
            datas.unshift({ text, id, bg: currentcolor, status: "PENDING" });
            datas = datas;
            text = "";
            localStorage.setItem("datas", JSON.stringify(datas));
        } else {
            zdToast("You need to enter something", 2);
        }
    };
    const changeToDo = (id, type) => {
        let index = datas.findIndex((data) => data.id == id);
        datas[index].status = type;
        localStorage.setItem("datas", JSON.stringify(datas));
    };
</script>

<div class="main-container d-flex col">
    <main class="d-flex justify-content-center ">
        <div class="make d-flex col" style="background-color:{currentcolor};">
            <h1 class="d-flex justify-content-center">
                <b> NEW TO DO </b>
            </h1>
            <input bind:value={text} />

            <div class="d-flex row space-between align-items-center buttons">
                <div class="btn-group">
                    {#each colors as color}
                        <button
                            class="color-btn"
                            class:active-color={currentcolor == color}
                            on:click={() => (currentcolor = color)}
                            style="background-color:{color}"
                        />
                    {/each}
                </div>
                <button
                    on:click={addToDo}
                    style="background-color:{currentcolor} ;"
                    class="save-btn d-flex align-items-center"
                >
                    SAVE
                </button>
            </div>
        </div>
    </main>
    <div class="container row d-flex">
        {#each status as statu}
            <div class="sub-container">
                <h1 class="d-flex justify-content-center">
                    {statu}
                </h1>
                <div class="card-container">
                    {#if datas && datas.length > 0}
                        {#each datas as data (data.id)}
                            {#if data.status == statu}
                                <div
                                    class=" d-flex col card space-between"
                                    style="background-color:{data.bg};"
                                    in:fly={{ y: -100 }}
                                    out:fly={{ y: +100 }}
                                >
                                    <p>
                                        {data.text}
                                    </p>
                                    <div class="d-flex row-reverse card-btns">
                                        <button
                                            class="delete-btn"
                                            on:click={() => {
                                                changeToDo(data.id, "DELETED");
                                            }}
                                        >
                                            DELETED
                                        </button>
                                        <button
                                            class="done-btn"
                                            on:click={() => {
                                                changeToDo(data.id, "DONE");
                                            }}
                                        >
                                            DONE
                                        </button>
                                        <button
                                            class="pending-btn"
                                            on:click={() => {
                                                changeToDo(data.id, "PENDING");
                                            }}
                                        >
                                            PENDING
                                        </button>
                                    </div>
                                </div>
                            {/if}
                        {/each}
                    {/if}
                </div>
            </div>
        {/each}
    </div>
</div>
