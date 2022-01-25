import "./Fields.css";
import Field from "./Field";

function Fields() {
  return (
    <div className="Fields">
      <form>
        <fieldset>
          <legend>Config</legend>
          <Field type={"number"} label="chainId" placeholder={43214} />
          <Field type={"number"} label="homesteadBlock" placeholder={0} />
          <Field type={"number"} label="eip150Block" placeholder={0} />
          <Field
            type={"text"}
            label="eip150Hash"
            placeholder={
              0x2086799aeebeae135c246c65021c82b4e15a2c451340993aacfd2751886514f0
            }
          />
          <Field type={"number"} label="eip155Block" placeholder={0} />
          <Field type={"number"} label="eip158Block" placeholder={0} />
          <Field type={"number"} label="byzantiumBlock" placeholder={0} />
          <Field type={"number"} label="constantinopleBlock" placeholder={0} />
          <Field type={"number"} label="petersburgBlock" placeholder={0} />
          <Field type={"number"} label="istanbulBlock" placeholder={0} />
          <Field type={"number"} label="muirGlacierBlock" placeholder={0} />
          <Field type={"number"} label="subnetEVMTimestamp" placeholder={0} />
          <fieldset>
            <legend>Fee Config</legend>
            <Field type={"number"} label="gasLimit" placeholder={8000000} />
            <Field
              type={"number"}
              label="minBaseFee"
              placeholder={25000000000}
            />
            <Field type={"number"} label="targetGas" placeholder={15000000} />
            <Field
              type={"number"}
              label="baseFeeChangeDenominator"
              placeholder={36}
            />
            <Field type={"number"} label="minBlockGasCost" placeholder={0} />
            <Field
              type={"number"}
              label="maxBlockGasCost"
              placeholder={1000000}
            />
            <Field type={"number"} label="targetBlockRate" placeholder={2} />
            <Field
              type={"number"}
              label="blockGasCostStep"
              placeholder={200000}
            />
          </fieldset>
        </fieldset>
        <fieldset>
          <legend>Alloc </legend>
          <Field
            type={"text"}
            label="address"
            placeholder={"8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"}
          />
          <Field
            type={"text"}
            label="balance"
            placeholder={"0x295BE96E64066972000000"}
          />
        </fieldset>
        <fieldset>
          <legend>General </legend>
          <div className="label text">
          
          <Field type={"text"} label="nonce" placeholder={"0x0"} />
          <Field type={"text"} label="timestamp" placeholder={"0x0"} />
          <Field type={"text"} label="extraData" placeholder={"0x00"} />
          <Field type={"text"} label="gasLimit" placeholder={"0x7A1200"} />
          <Field type={"text"} label="difficulty" placeholder={"0x0"} />
          <Field
            type={"text"}
            label="mixHash"
            placeholder={
              "0x0000000000000000000000000000000000000000000000000000000000000000"
            }
          />
          </div>
          <Field
            type={"text"}
            label="coinbase"
            placeholder={"0x0000000000000000000000000000000000000000"}
          />
          <Field type={"text"} label="number" placeholder={"0x0"} />
          <Field type={"text"} label="gasUsed" placeholder={"0x0"} />
          <Field
            type={"text"}
            label="parentHash"
            placeholder={
              "0x0000000000000000000000000000000000000000000000000000000000000000"
            }
          />
        </fieldset>
      </form>
      <button>Create Subnet 🚀</button>
    </div>
  );
}

export default Fields;
