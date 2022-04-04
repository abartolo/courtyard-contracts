import { api } from "../../utils/api";

export async function currentHeight() {
    return api.get('/blocks?limit=1')
        .then(res => res.data)
        .then(res => res.items[0].height);
}

export function unspentBoxesFor(address: string) {
    return api.get(`/transactions/boxes/byAddress/unspent/${address}`).then(
        (res) => res.data
    );
}

export function boxById(id: string) {
    return api.get(`/transactions/boxes/${id}`).then((res) => res.data);
}

export function txById(id: string) {
    return api.get(`/transactions/${id}`).then((res) => res.data);
}

export async function getSpendingTx(boxId: string) {
    const data = api.get(`/transactions/boxes/${boxId}`);
    return data
        .then((res) => res.data)
        .then((res) => res.spentTransactionId)
        .catch((_) => null);
}

export function getUnconfirmedTxsFor(addr: string) {
    return api.get(
        `/transactions/unconfirmed/byAddress/${addr}`
    )
        .then((res) => res.data)
        .then((res) => res.items);
}

export function getTokenBox(addr: string) {
    return api.get(
        `/assets/${addr}/issuingBox`
    )
        .then((res) => res.data[0])
}

export function getBalanceFor(addr: string, token = null) {
    return api.get(
        `/addresses/${addr}`
    )
        .then((res) => res.data)
        .then((res) => res.transactions)
        .then(res => {
            if (!token) return res.confirmedBalance;
            let tok = res.confirmedTokensBalance.filter(tok => tok.tokenId === token);
            if (tok.length === 0) return 0;
            else return tok[0].amount;
        });
}