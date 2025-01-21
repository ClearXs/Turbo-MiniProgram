import Config from "@/types/config";
import { Button, Camera, View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useMemo, useState } from "react";

import { useApp, useCamera, useEnv, useRequest, useToast } from "taro-hooks";

const Home = () => {
  const [cameraContext, { zoom, start, stop, take, listener }] = useCamera();

  const [showCamera, setShowCamera] = useState<boolean>();

  const [tokenPhotoUrl, setTokenPhotoUrl] = useState<string>();

  const { globalData } = useApp<Config>();

  const { show, hide } = useToast();

  const uploadFile = useMemo(() => {
    return (tempFilepath: string) => {
      const httpUrl = globalData.http.url;

      Taro.uploadFile({
        url: httpUrl + "/polls/ocr/upload",
        filePath: tempFilepath,
        name: "file",
        fileName: "file",
        fail(res) {
          show({ title: res.errMsg });
        },
        success(result) {},
      });
    };
  }, []);

  return (
    <View>
      <Button
        onClick={() => {
          Taro.getFileInfo({
            filePath: "/",
            success(result) {
              console.log(result);
            },
          });
        }}
      >
        打开文件
      </Button>
      <Button
        onClick={() => {
          Taro.makePhoneCall({ phoneNumber: "1313" });
        }}
      >
        打电话
      </Button>

      <Button
        onClick={() => {
          Taro.chooseImage({ count: 3 });
        }}
      >
        打开相册
      </Button>

      <Button
        onClick={() => {
          setShowCamera(true);
        }}
      >
        打开摄像头
      </Button>

      <Button
        onClick={() => {
          setShowCamera(false);
        }}
      >
        关闭摄像头
      </Button>

      {showCamera && (
        <View>
          <Camera
            devicePosition="back" // 摄像头位置，可选 front 或 back
            flash="off" // 闪光灯，可选 auto, on, off
            style={{ width: "100%", height: "400px" }}
          >
            {" "}
          </Camera>
          <Button
            onClick={() => {
              take().then(({ errMsg, tempImagePath }) => {
                console.log(errMsg);
                console.log(tempImagePath);

                Taro.downloadFile({
                  url: tempImagePath,
                  success(result) {
                    if (result.statusCode === 200) {
                      setTokenPhotoUrl(result.tempFilePath);
                      uploadFile(result.tempFilePath);
                    }
                  },
                });
              });
            }}
          >
            拍照
          </Button>

          {tokenPhotoUrl && <Image src={tokenPhotoUrl}></Image>}
        </View>
      )}
    </View>
  );
};

export default Home;
