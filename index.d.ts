declare type Scene = {
  sceneId: number;
  interactions: Interaction[];
  cameraStartPosition: string;
  sceneType: "360" | "static" | null;
};

declare type Interaction = {
  interactionpos: string;
  action: {
    library: string;
    params: {
      nextSceneId?: number | string;
    };
  };
};

declare type CameraPosition = {
  yaw: number;
  pitch: number;
};

declare type Library = {
  uberName: string;
}

declare type ScenePreview = {
  getCamera: () => {
    camera: CameraPosition;
    fov: number;
  }
}

declare const H5P: any;
