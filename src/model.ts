export interface IProjectBase {
    name: string;
    description: string;
    image: string;
    tags: string[];
}

export interface ILocalProject extends IProjectBase {
    dir: string;
    cmd: string;
    dist: string;
}

export interface ICloudProject extends IProjectBase {
    href: string;
}

export type IProject = ILocalProject | ICloudProject;
